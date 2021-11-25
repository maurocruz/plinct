import useAppContext from '@contexts/App'

import * as styles from './ProfileInfo.module.css'

const ProfileInfo = ({ children }) => {
  const { selectedFeature } = useAppContext()

  if (selectedFeature.profiles) {
    return (
      <div className={styles.component}>
        <h2 className={styles.name}>{selectedFeature.location}</h2>
        {selectedFeature.profiles.map(profile => (
          <h3 key={profile.uid}>{profile.name}</h3>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.component}>
      <div className={styles.avatar} style={{ backgroundImage: `url(/avatar.png)` }}>
        <div className={styles.avatar} style={{ backgroundImage: `url(/profiles/${selectedFeature.uid}/avatar.jpg)` }} />
      </div>
      <h2 className={styles.name}>{selectedFeature.name}</h2>
      {selectedFeature.role && (
        <p className={styles.paragraph}><strong>Role: </strong> {selectedFeature.role}</p>
      )}
      {selectedFeature.location && (
        <p className={styles.paragraph}><strong>Location: </strong> {selectedFeature.location}</p>
      )}
      {selectedFeature.timezone && (
        <p className={styles.paragraph}><strong>Timezone: </strong> {selectedFeature.timezone}</p>
      )}
      {selectedFeature.networks?.github && (
        <p className={styles.paragraph}><strong>GitHub: </strong> <a href={`https://github.com/${selectedFeature.networks.github}`} target="_blank" rel="noreferrer">{selectedFeature.networks.github}</a></p>
      )}
      {selectedFeature.networks?.stackoverflow && (
        <p className={styles.paragraph}><strong>StackOverflow: </strong> <a href={`https://stackoverflow.com/users/${selectedFeature.networks.stackoverflow}`} target="_blank" rel="noreferrer">{selectedFeature.networks.stackoverflow}</a></p>
      )}
      {selectedFeature.networks?.linkedin && (
        <p className={styles.paragraph}><strong>LinkedIn: </strong> <a href={`https://linkedin.com/in/${selectedFeature.networks.linkedin}`} target="_blank" rel="noreferrer">{selectedFeature.networks.linkedin}</a></p>
      )}
      {selectedFeature.networks?.twitter && (
        <p className={styles.paragraph}><strong>Twitter: </strong> <a href={`https://twitter.com/${selectedFeature.networks.twitter}`} target="_blank" rel="noreferrer">{selectedFeature.networks.twitter}</a></p>
      )}
      {selectedFeature.networks?.instagram && (
        <p className={styles.paragraph}><strong>Instagram: </strong> <a href={`https://instagram.com/${selectedFeature.networks.instagram}`} target="_blank" rel="noreferrer">{selectedFeature.networks.instagram}</a></p>
      )}
    </div>
  )
}

export default ProfileInfo
