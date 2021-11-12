import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import DB from '../db'
import Parser from "../../node/parsers/parser";
import {loadAllTables} from "../App";
import {useDispatch} from "react-redux";

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
  const settings = await DB.getSettings()
  changeSettings(settings)
  changeInitialSettings(settings)
}

const updateSettings = (initialSettings, settings) => async () => {
  const updateStatsPath = async () => {
    const statsPath = settings?.statsPath?.replace(/^\\\\\?\\/, "")?.replace(/\\/g, '\/')?.replace(/\/\/+/g, '\/')
    if (statsPath !== initialSettings.statsPath) {
      console.log(statsPath, initialSettings.statsPath)
      await DB.updateStatsPath(statsPath)
    }
  }

  const updateGuid = async () => {
    if (settings.guid !== initialSettings.guid) {
      await DB.updateGuid(settings.guid)
    }
  }

  await updateStatsPath()
  await updateGuid()
}

const handleStatsPathUpdate = (changeSettings, settings) => async e => {
  changeSettings({...settings, statsPath: e?.target?.value})
}

const handleGuidPathUpdate = (changeSettings, settings) => async e => {
  changeSettings({...settings, guid: e?.target?.value})
}

const handleClearDBClick = (changeSettings, changeInitialSettings) => async () => {
  await DB.clearDB()
  await DB.initSettings()
  await loadSettings(changeSettings, changeInitialSettings)
}

const handleLoadDataClick = (dispatch, changeSettings, changeInitialSettings) => async () => {
  await Parser.getAndUpdateMatchData()
  await loadAllTables(dispatch)
  loadSettings(changeSettings, changeInitialSettings)
}

const Settings = () => {
  const dispatch = useDispatch()
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
        <input value={settings.guid} onChange={handleGuidPathUpdate(changeSettings, settings)}/>
        <div>guid</div>
      </StatsWrapper>

      <button onClick={updateSettings(initialSettings, settings)}>Update Settings</button>
      <button onClick={handleLoadDataClick(dispatch, changeSettings, changeInitialSettings)}>Load Data</button>
      <button onClick={handleClearDBClick(changeSettings, changeInitialSettings)}>Clear DB
      </button>
    </SettingsWrapper>
  )
}

export default Settings