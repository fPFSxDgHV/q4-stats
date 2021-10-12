import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import DB from '../db'
import Parser from "../../node/parsers/parser";

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  font-family: Roboto;
`

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`

const loadSettings = async (changeSettings, changeInitialSettings) => {
  console.log('loadSettings')
  const settings = await DB.getSettings()
  changeSettings(settings)
  changeInitialSettings(settings)
}

const updateSettings = (initialSettings, settings) => async () => {
  const updateStatsPath = async () => {
    const statsPath = settings?.statsPath?.replace(/^\\\\\?\\/,"")?.replace(/\\/g,'\/')?.replace(/\/\/+/g,'\/')
    if (statsPath !== initialSettings.statsPath) {
      console.log(statsPath, initialSettings.statsPath)
      await DB.updateStatsPath(statsPath)
    }
  }

  await updateStatsPath()
}

const handleStatsPathUpdate = (changeSettings, settings) => async e => {
  changeSettings({...settings, statsPath: e?.target?.value})
}

const handleUpdateClick = (settings) => () => {
  console.log(settings)
}

const Settings = () => {
  const [settings, changeSettings] = useState({})
  const [initialSettings, changeInitialSettings] = useState({})
  console.log(settings)
  useEffect(() => {
    loadSettings(changeSettings, changeInitialSettings)
  }, [])

  return (
    <SettingsWrapper>
      <div>Settings</div>
      <StatsWrapper>
        <input value={settings.statsPath} onChange={handleStatsPathUpdate(changeSettings, settings)}/>
        <div>stats path</div>
      </StatsWrapper>
      <StatsWrapper>
        <select>
          <option value={"en"}>english</option>
          <option value={"ru"}>русский</option>
        </select>
        <div>Language</div>
      </StatsWrapper>
      <StatsWrapper>
        <input />
        <div>guid</div>
      </StatsWrapper>

      <button onClick={updateSettings(initialSettings, settings)}>Update</button>
      <button onClick={Parser.getAndUpdateMatchData}>load</button>
    </SettingsWrapper>
  )
}

export default Settings