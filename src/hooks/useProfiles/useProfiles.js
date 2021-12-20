import { useEffect, useState, useCallback } from 'react'
import useSWR from 'swr'
import axios from 'axios'

import { dataToGeoFeatureCollection } from '@lib/geo'

import staticData from '@public/profiles'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const PROFILES_ENDPOINT = `${API_URL}/profiles/xmap`
const GMAPS_API_KEY = process.env.NEXT_PUBLIC_GMAPS_API_KEY
const GMAPS_GEOCODE_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?key=${GMAPS_API_KEY}`

function useProfiles () {
  const { data, error } = useSWR(PROFILES_ENDPOINT)
  const [isLoading, setIsLoading] = useState(true)
  const [featureCollection, setFeatureCollection] = useState(null)

  const translateAPIProfiles = (profiles = []) => profiles
    .map(profile => {
      if (!Boolean(profile?.country?.trim())) {
        return null
      }
      return ({
        uid: profile.id,
        name: profile.fullName,
        role: profile.summary,
        place: profile.place,
        location: [profile.place.city, profile.place.country].join(' - '),
        timezone: profile.timezoneOffset,
        networks: {
          github: profile.githubAccount,
          stackoverflow: profile.stackoverflowAccount,
          linkedin: profile.linkedinAccount,
        }
      })
    })

  const groupByLocation = (profiles = []) => profiles
    .reduce((acc, cur) => {
      if (!Boolean(cur.location?.trim())) {
        return acc
      }

      const existingLocation = acc.findIndex(a => a.location === cur.location)

      if (existingLocation >= 0) {
        acc[existingLocation] = {
          ...acc[existingLocation],
          profiles: [
            ...acc[existingLocation].profiles,
            {
              ...cur,
              type: 'profile',
            },
          ]
        }
        return acc
      }

      return [
        ...acc,
        {
          type: 'profile',
          location: cur.location,
          profiles: [
            {
              ...cur,
              type: 'profile',
            }
          ]
        }
      ]
    }, [])

  const getCoordinatesFromLocation = async (locations = []) => await Promise.all(
    locations
      .map(async place => {
        if (!Boolean(place?.location?.trim())) {
          return null
        }
        const { data: { results } } = await axios.get(`${GMAPS_GEOCODE_ENDPOINT}&address=${place.location}`)
        const { location } = results[0]?.geometry
        const coordinates = [location.lng, location.lat]
        const profiles = place.profiles?.map(profile => ({
          ...profile,
          location: place.location,
          coordinates,
        }))
        return {
          ...place,
          profiles,
          coordinates,
        }
      })
  ).then(data => data.filter(Boolean))

  const addLocationFromPlaces = (profiles = []) => profiles.map(profile => ({
    ...profile,
    location: [profile.place?.city, profile.place?.country].join(' - '),
  }))

  const generateFeatureCollection = useCallback(async () => {
    let profiles

    if (Boolean(error)) {
      profiles = addLocationFromPlaces(staticData.profiles)
    } else if (data?.profiles?.length > 0 && !Boolean(error)) {
      profiles = translateAPIProfiles(data.profiles)
    }

    if ((data && !error) || profiles) {
      const groupedByLocation = await getCoordinatesFromLocation(groupByLocation(profiles))
      const featureCollection = dataToGeoFeatureCollection(groupedByLocation)
      setFeatureCollection(featureCollection)
      setIsLoading(false)
    }
  }, [data, error])

  useEffect(() => {
    generateFeatureCollection()
  }, [generateFeatureCollection])

  return {
    profiles: featureCollection,
    isLoadingProfiles: isLoading,
  }
}

export default useProfiles
