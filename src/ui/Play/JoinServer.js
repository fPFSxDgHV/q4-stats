import React from 'react'

import { UKFlag} from "../Reuse/Icons/flags/uk";
import { USFlag} from "../Reuse/Icons/flags/us";
import {RUFlag} from "../Reuse/Icons/flags/ru";
import { EUFlag} from "../Reuse/Icons/flags/eu";
import {UAFlag} from "../Reuse/Icons/flags/ua";
import {FlagWrapper, JoinServerWrapper, NameWrapper} from "./styles";
import {Button} from "../Reuse/Button";
import {openGameAndJoinServer} from "./exec";

const flags = {
  ru: <RUFlag />,
  uk: <UKFlag />,
  us: <USFlag />,
  eu: <EUFlag />,
  ua: <UAFlag />,
}

export const JoinServer = ({server, statsPath, flag}) => {
  const {ip, name} = server
  return (
    <JoinServerWrapper>
      <FlagWrapper>
        {flags[flag]}
        <NameWrapper>{name}</NameWrapper>
      </FlagWrapper>
      <div onClick={() => openGameAndJoinServer(statsPath, ip)}>
        <Button>connect</Button>
      </div>
    </JoinServerWrapper>
  )
}