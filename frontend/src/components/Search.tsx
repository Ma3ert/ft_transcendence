import { Input, Stack } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import ScrollableStack from './ScrollableStack'
import apiClient from '@/services/requestProcessor'
import { AxiosResponse } from 'axios'
import UserField from './UserField'

type Props = {}

const Search = (props: Props) => {
  const [searchResult, SetSearchResult] = useState<ReactNode[]>([])
  const client = new apiClient("/users")

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    client.getData("").then((res: AxiosResponse) => {
      const newSearchResult: ReactNode[] = [];
      res.data.map((user:any) => {
        newSearchResult.push(<UserField userName={user.username} userPic={"http://localhost:3000/public/users/imgs/" + user.avatar}/>)
      })
      SetSearchResult(newSearchResult);
    })
  }
  return (
    <Stack align={"center"} spacing={"30px"}>
        <Input
          variant={"default"}
          width={{base: "150px", sm: "250px", md: "350px",  lg:"450px" }} h={"60px"}
          placeholder='search for a user'
          onChange={handleSearch}
        />
        <ScrollableStack
          items={searchResult}
          width={{base: "150px", sm: "250px", md: "350px",  lg:"450px" }} 
          height={{base: "224px", sm: "424px", md: "425px", lg: "624px"}} 
          spacing= {{ base: "5px", md:"8px", lg: "10px", xl: "12px" }}
        />
    </Stack>
  )
}

export default Search