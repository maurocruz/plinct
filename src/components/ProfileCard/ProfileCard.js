import * as styles from './ProfileCard.module.css'

const ProfileCard = ({ profile, inAccordion }) => (
  <div className={[styles.profile, inAccordion ? styles.accordion : ''].join(' ')}>
    <div className={styles.avatar} style={{ backgroundImage: `url(/avatar.png)` }}>
      <div className={styles.avatar} style={{ backgroundImage: `url(/profiles/${profile.uid}/avatar.jpg)` }} />
    </div>
    {!inAccordion && (
      <h3 className={styles.name}>{profile.name}</h3>
    )}
    {profile.role && (
      <p className={styles.paragraph}><strong>Role: </strong> {profile.role}</p>
    )}
    {profile.location && (
      <p className={styles.paragraph}><strong>Location: </strong> {profile.location}</p>
    )}
    {profile.timezone && (
      <p className={styles.paragraph}><strong>Timezone: </strong> {profile.timezone}</p>
    )}
    {profile.networks?.github && (
      <p className={styles.paragraph}><strong>GitHub: </strong> <a href={`https://github.com/${profile.networks.github}`} target="_blank" rel="noreferrer">{profile.networks.github}</a></p>
    )}
    {profile.networks?.stackoverflow && (
      <p className={styles.paragraph}><strong>StackOverflow: </strong> <a href={`https://stackoverflow.com/users/${profile.networks.stackoverflow}`} target="_blank" rel="noreferrer">{profile.networks.stackoverflow}</a></p>
    )}
    {profile.networks?.linkedin && (
      <p className={styles.paragraph}><strong>LinkedIn: </strong> <a href={`https://linkedin.com/in/${profile.networks.linkedin}`} target="_blank" rel="noreferrer">{profile.networks.linkedin}</a></p>
    )}
    {profile.networks?.twitter && (
      <p className={styles.paragraph}><strong>Twitter: </strong> <a href={`https://twitter.com/${profile.networks.twitter}`} target="_blank" rel="noreferrer">{profile.networks.twitter}</a></p>
    )}
    {profile.networks?.instagram && (
      <p className={styles.paragraph}><strong>Instagram: </strong> <a href={`https://instagram.com/${profile.networks.instagram}`} target="_blank" rel="noreferrer">{profile.networks.instagram}</a></p>
    )}
  </div>
)

export default ProfileCard
