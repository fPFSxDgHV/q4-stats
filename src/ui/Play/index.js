import React from 'react'

import {servers} from "../data";
import {toPairs} from "ramda";

import {useSelector} from "react-redux";
import {openGameAndJoinServer} from "./exec";


const JoinServer = ({server, statsPath}) => {
  const {ip, name} = server
  return (
    <div>
      <div>{name}</div>
      <button onClick={() => openGameAndJoinServer(statsPath, ip)}>connect</button>
    </div>
  )
}

const Play = () => {
  const statsPath = useSelector(state => state?.settings?.statsPath)
  const serversData = toPairs(servers)

  return (
    <div>
      <div>Connect to WWW servers:</div>
      {serversData.map(server => <JoinServer key={server[0]} statsPath={statsPath} server={{name: server[1], ip: server[0]}}/>)}
    </div>
  )
}

export default Play