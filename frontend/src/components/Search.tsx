import { Input, Stack } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const Search = (props: Props) => {
  return (
    <Stack>
        <Input variant={"default"} w={"400px"} h={"60px"} placeholder='search for a user'>
        </Input>
    </Stack>
  )
}

export default Search