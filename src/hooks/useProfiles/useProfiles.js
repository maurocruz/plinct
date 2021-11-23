import { useEffect, useState, useCallback } from 'react'
import useSWR from 'swr'

import { dataToGeoFeatureCollection } from '@lib/geo'

import staticData from '@public/data'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
const PROFILES_ENDPOINT = API_URL + '/profiles/xmap'

function useProfiles () {
  const { data, error } = useSWR(PROFILES_ENDPOINT)

  const translateAPIProfiles = (profiles = []) => profiles.map(profile => (
    {
      type: 'profile',
      uid: profile.id,
      name: profile.fullName,
      coordinates: [-45.0722002, -23.3975554],
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
    }
  ))

  const generateFeatureCollection = useCallback(() => {
    let profiles

    if (Boolean(error)) {
      profiles = staticData.profiles
    } else if (data?.profiles?.length > 0 && !Boolean(error)) {
      profiles = translateAPIProfiles(data.profiles)
    }

    const featureCollection = (data || profiles) && dataToGeoFeatureCollection(profiles)
    return featureCollection
  }, [data, error])

  return generateFeatureCollection()
}

export default useProfiles
