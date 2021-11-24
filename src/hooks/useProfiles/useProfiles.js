import { useEffect, useState, useCallback } from 'react'
import useSWR from 'swr'
import axios from 'axios'

import { dataToGeoFeatureCollection } from '@lib/geo'

import staticData from '@public/profiles'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
const PROFILES_ENDPOINT = `${API_URL}/profiles/xmap`
const GMAPS_API_KEY = process.env.NEXT_PUBLIC_GMAPS_API_KEY
const GMAPS_GEOCODE_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?key=${GMAPS_API_KEY}`

function useProfiles () {
  const { data, error } = useSWR(PROFILES_ENDPOINT)
  const [featureCollection, setFeatureCollection] = useState(null)

  const translateAPIProfiles = async (profiles = []) => await Promise.all(
    profiles
      .map(async profile => {
        if (!Boolean(profile?.country?.trim())) {
          return null
        }

        const { data: { results } } = await axios.get(`${GMAPS_GEOCODE_ENDPOINT}&address=${profile.country}`)
        const { location } = results[0]?.geometry
        const coordinates = [location.lng, location.lat]

        return ({
          type: 'profile',
          uid: profile.id,
          name: profile.fullName,
          coordinates,
          role: profile.summary,
          location: profile.country,
          timezone: profile.timezoneOffset,
          networks: {
            github: profile.githubAccount,
            stackoverflow: profile.stackoverflowAccount,
            linkedin: profile.linkedinAccount,
            // twitter: profile.twitterAccount,
            // instagram: profile.instagramAccount,
          }
        })
      })
  ).then(data => data.filter(Boolean))

  const generateFeatureCollection = useCallback(async () => {
    let profiles = []

    if (Boolean(error)) {
      profiles = staticData.profiles
    } else if (data?.profiles?.length > 0 && !Boolean(error)) {
      profiles = await translateAPIProfiles(data.profiles)
    }

    const featureCollection = (data || profiles) && dataToGeoFeatureCollection(profiles)
    setFeatureCollection(featureCollection)
  }, [data, error])

  useEffect(() => {
    generateFeatureCollection()
  }, [generateFeatureCollection])

  return featureCollection
}

export default useProfiles
