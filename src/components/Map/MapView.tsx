import React, {FC} from 'react'
import { Map, Marker } from "pigeon-maps"

type IMapProps = {
  data: any
}


const MapView: FC<IMapProps> = ({data}) => {
  return (
    <Map height={400} defaultCenter={[44.08683530625218, -121.28170597038259]} defaultZoom={11}>
      
      {
        data && data.length > 0 && data.map((item: any, index: number) =>  <Marker key={`map${index}`} width={50} anchor={[parseFloat(item.latitude), parseFloat(item.longitude)]} color={"blue"}  /> )
      }
    </Map>
  )
}

export default MapView