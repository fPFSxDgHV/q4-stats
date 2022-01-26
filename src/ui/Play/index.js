import React from 'react'
import {useSelector} from "react-redux";
import {map, pipe, toPairs, values} from "ramda";

import {serversData} from "../data";

import {ConnectTextWrapper, ConnectToWrapper, PlayWrapper} from "./styles";
import {ServerIcon} from "../Reuse/Icons/Server";
import {JoinServer} from "./JoinServer";

const mapServerData = pipe(
  toPairs,
  map(q => [q[0], ...values(q[1])])
)

const Play = () => {
  const statsPath = useSelector(state => state?.settings?.statsPath)
  const serverPairs = mapServerData(serversData)
  console.log(serverPairs)

  return (
    <PlayWrapper>
      <ConnectToWrapper>
        <ServerIcon />
        <ConnectTextWrapper>Connect to WWW servers</ConnectTextWrapper>
      </ConnectToWrapper>
      {serverPairs.map(server => <JoinServer key={server[0]} statsPath={statsPath} server={{name: server[1], ip: server[0]}} flag={server[2]}/>)}
    </PlayWrapper>
  )
}

export default Play