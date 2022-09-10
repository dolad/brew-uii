import React, { useState, useEffect } from 'react';
import Search from '../../components/Search/Search';
import { Interceptor } from '../../services/axios/Interceptor';
import { getAllBreweries, getBreweriesByCities } from '../../services/brewery.service';
import Loader from '../../components/Loader/Loader';
import BreweryList from '../../components/BreweryList/BreweryList';
import MapView from '../../components/Map/MapView';

type Data = {
    data: unknown
}

function Home() {
 const [status, setStatus] = useState<"idle" | "pending" | "fulfilled" | "error">("idle");
 const [data, setData] = useState<Data | null>(null);
 const [searchValues, setSearchValues] = useState<string>("")
 

 const fetchData = () => {
    if (status === "idle") {
        (async () => {
          setStatus("pending");
          const res = await getAllBreweries();
          if ("data" in res) {
            setStatus("fulfilled");
            setData(res);
          } else {
            setStatus("error");
          }
        })();
      }
      return  <BreweryList items={data?.data} />
};


 useEffect(() => {
   fetchData();
  }, []);
  return (
    <>
      <Interceptor />
      <Search setSearchValues={setSearchValues} searchValues={searchValues} setData={setData} />
      <MapView data={data?.data} />
      {(status === "idle" || status === "pending") && <Loader />}
      {status === "error" && <h1>Error</h1>}
      {status === "fulfilled" && <BreweryList items={data?.data} /> }
    </>
  )
}

export default Home