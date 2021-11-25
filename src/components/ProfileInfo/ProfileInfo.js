import ProfileCard from '@components/ProfileCard'

import useAppContext from '@contexts/App'

import * as styles from './ProfileInfo.module.css'

const ProfileInfo = ({ children }) => {
  const { selectedFeature } = useAppContext()

  if (selectedFeature.profiles) {
    return (
      <div className={styles.component}>
        <h2 className={styles.name}>{selectedFeature.location}</h2>
        {selectedFeature.profiles.map(profile => (
          <ProfileCard key={profile.uid} profile={profile} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.component}>
      <ProfileCard profile={selectedFeature} />
    </div>
  )
}

export default ProfileInfo
