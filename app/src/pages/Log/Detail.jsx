import { getLogApi } from "@/api/log";
import { Container } from "@/components/Container";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Detail (){
  const [ jsonStr,setJsonStr ] = useState()
  const { state } = useLocation()

  useEffect(()=>{

    async function loadDetail(){
      const data = await getLogApi(state)
      const info = JSON.parse(data)
      setJsonStr(JSON.stringify(info,null,4))
      window._info = info
    }

    loadDetail()
  

    return ()=>{
      console.log("清空")
    }
  },[])
  
  return (
    <Container>
      <pre>{jsonStr}</pre>
    </Container>
  );
}

export default Detail