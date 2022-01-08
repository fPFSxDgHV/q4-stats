import React from 'react'

import {servers} from "../data";
import {toPairs} from "ramda";

import {useSelector} from "react-redux";
import {openGameAndJoinServer} from "./exec";
import {ConnectToWrapper, JoinServerWrapper, PlayWrapper} from "./styles";


const JoinServer = ({server, statsPath}) => {
  const {ip, name} = server
  return (
    <JoinServerWrapper>
      <div>{name}</div>
      <button onClick={() => openGameAndJoinServer(statsPath, ip)}>connect</button>
    </JoinServerWrapper>
  )
}

const Play = () => {
  const statsPath = useSelector(state => state?.settings?.statsPath)
  const serversData = toPairs(servers)

  return (
    <PlayWrapper>
      <ConnectToWrapper>Connect to WWW servers:</ConnectToWrapper>
      {serversData.map(server => <JoinServer key={server[0]} statsPath={statsPath} server={{name: server[1], ip: server[0]}}/>)}
    </PlayWrapper>
  )
}

export default Play