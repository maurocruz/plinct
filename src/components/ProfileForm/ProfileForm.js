import { useState, useEffect, useCallback, createElement } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import * as styles from './ProfileForm.module.css'

const ProfileForm = () => {
  const [data, setData] = useState({})
  const [stringData, setStringData] = useState('')
  const [copied, setCopied] = useState(false)
  const [hover, setHover] = useState(false)

  const isValidJSON = (value) => {
    try {
      JSON.parse(value)
      return {
        valid: true,
      }
    } catch (e) {
      return {
        valid: false,
        message: e.toString(),
      }
    }
  }

  const nlToBr = (string) => {
    const newlineRegex = /(\r\n|\n\r|\r|\n)/g
    return string !== '' ?
      string.split(newlineRegex).map((line, index) => {
        if (line.match(newlineRegex)) {
          return createElement('br', { key: index })
        }
        return line
      }) : ''
  }

  const getNewData = useCallback((field, value) => {
    const setField = (fieldName, fieldValue) => field === fieldName
      ? fieldValue
      : data[fieldName] || ''
    const setPlaceField = (fieldName, fieldValue) => field === fieldName
      ? fieldValue
      : data.place ? data.place[fieldName] : ''
    const setNetworksField = (fieldName, fieldValue) => field === fieldName
      ? fieldValue
      : data.networks ? data.networks[fieldName] : ''

    return {
      uid: setField('uid', value),
      name: setField('name', value),
      role: setField('role', value),
      place: {
        country: setPlaceField('country', value),
        city: setPlaceField('city', value),
      },
      timezone: setField('timezone', value),
      networks: {
        github: setNetworksField('github', value),
        stackoverflow: setNetworksField('stackoverflow', value),
        linkedin: setNetworksField('linkedin', value),
        twitter: setNetworksField('twitter', value),
        instagram: setNetworksField('instagram', value),
      }
    }
  }, [data])

  const getStringValue = (newData) => typeof newData === 'object' ? JSON.stringify(newData, null, 2) : newData

  const handleChange = (field) => (event) => {
    const value = event?.currentTarget?.value
    const newData = getNewData(field, value)
    const stringValue = getStringValue(newData)
    setData(newData)
    setStringData(stringValue)
  }

  const handleCopy = () => setCopied(true)

  const handleMouseEnter = () => setHover(true)

  const handleMouseLeave = () => {
    setHover(false)
    setCopied(false)
  }

  useEffect(() => {
    const newData = getNewData()
    const stringValue = getStringValue(newData)
    setData(newData)
    setStringData(stringValue)
  }, []) // eslint-disable-line

  return (
    <div className={styles.component}>
      <div className={styles.instructions}>
        <h2>How to add new profile to the X-Map</h2>
        <p>This project is just a POC of a community world map. It&apos;s on early MVP stage and currently rely on static data. Bellow you&apos;ll find instructions to include your profile to the map. Beyond that, any other contributions are welcomed too!</p>
        <ol>
          <li>Fill all the inputs bellow</li>
          <li>Make a fork of the repository <a href="https://github.com/bernardodiasc/x-map" target="_blank" rel="noreferrer">https://github.com/bernardodiasc/x-map</a></li>
          <li>Create a new directory at <a href="https://github.com/bernardodiasc/x-map/tree/master/public/profiles" target="_blank" rel="noreferrer"><code>/public/profiles</code></a> using same <b>UID</b> value</li>
          <li>Under the new directory, create a new file called <code>profile.json</code></li>
          <li>Copy the JSON output bellow to the new <code>profile.json</code> file</li>
          <li>Also under the new directory, attach an image called <code>avatar.jpg</code></li>
          <li>Import the new JSON file in the index: <a href="https://github.com/bernardodiasc/x-map/tree/master/public/profiles/index.js" target="_blank" rel="noreferrer"><code>/public/profiles/index.js</code></a></li>
          <li>Submit a Pull Request with your additions</li>
        </ol>
      </div>
      <div className={styles.form}>
        <label className={styles.label}>
          <span>UID:</span>
          <input
            className={styles.input}
            name="uid"
            value={data.uid}
            onChange={handleChange("uid")}
          />
        </label>
        <label className={styles.label}>
          <span>Full Name:</span>
          <input
            className={styles.input}
            name="name"
            value={data.name}
            onChange={handleChange("name")}
          />
        </label>
        <label className={styles.label}>
          <span>Role:</span>
          <input
            className={styles.input}
            name="role"
            value={data.role}
            onChange={handleChange("role")}
          />
        </label>
        <label className={styles.label}>
          <span>Country:</span>
          <input
            className={styles.input}
            name="country"
            value={data.country}
            onChange={handleChange("country")}
          />
        </label>
        <label className={styles.label}>
          <span>City:</span>
          <input
            className={styles.input}
            name="city"
            value={data.city}
            onChange={handleChange("city")}
          />
        </label>
        <label className={styles.label}>
          <span>Timezone:</span>
          <input
            className={styles.input}
            name="timezone"
            value={data.timezone}
            onChange={handleChange("timezone")}
          />
        </label>
        <label className={styles.label}>
          <span>GitHub:</span>
          <input
            className={styles.input}
            name="github"
            value={data.networks?.github}
            onChange={handleChange("github")}
          />
        </label>
        <label className={styles.label}>
          <span>StackOverflow:</span>
          <input
            className={styles.input}
            name="stackoverflow"
            value={data.networks?.stackoverflow}
            onChange={handleChange("stackoverflow")}
          />
        </label>
        <label className={styles.label}>
          <span>LinkedIn:</span>
          <input
            className={styles.input}
            name="linkedin"
            value={data.networks?.linkedin}
            onChange={handleChange("linkedin")}
          />
        </label>
        <label className={styles.label}>
          <span>Twitter:</span>
          <input
            className={styles.input}
            name="twitter"
            value={data.networks?.twitter}
            onChange={handleChange("twitter")}
          />
        </label>
        <label className={styles.label}>
          <span>Instagram:</span>
          <input
            className={styles.input}
            name="instagram"
            value={data.networks?.instagram}
            onChange={handleChange("instagram")}
          />
        </label>

        <div className={styles.json}>
          <span>JSON output:</span>
          <CopyToClipboard
            text={stringData}
            onCopy={handleCopy}
          >
            <pre
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={styles.pre}
            >
              {hover && (
                <div className={styles.copy}>
                  <span>{copied ? 'Copied!' : 'Click to copy'}</span>
                  <svg height="16" viewBox="0 0 16 16" width="16">
                    <path fillRule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
                    <path fillRule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
                  </svg>
                </div>
              )}
              <code className={styles.code}>
                {nlToBr(stringData)}
              </code>
            </pre>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
