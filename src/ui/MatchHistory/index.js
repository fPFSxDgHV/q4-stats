import React, { useState} from 'react'
import {useSelector} from "react-redux";
import styled from 'styled-components'
import { maps, guids } from "../data";

import SingleDuel from './SingleDuel'








const MatchHistory = () => {
  const tdm = useSelector(state => state?.tdm?.matches)
  const duel = useSelector(state => state?.duel?.matches)
  const guid = useSelector(state => state?.settings?.guid)

  console.log(tdm, duel, guid)
  return (
    <div>
      {duel?.map(q => <SingleDuel matchData={q} guid={guid} />)}
    </div>
  )
}

export default MatchHistory