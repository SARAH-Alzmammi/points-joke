import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../services';
export default function Home() {
  
  const [pointsData, setPointsData] = useState([])
  useEffect(() => {
    getData()
  }, [])
  async function getData() {

    try {


      let { data, error } = await supabase
      .from('points')
      .select('*')  .order('points', { ascending: false })

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        console.log(data)
        setPointsData(data as any)

      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } 
  }

  return (
    <>
      <Head>
        <title>POINTS</title>
      </Head>
      <main className='flex flex-col items-center w-full'>
        <h1 className='text-emerald-700 text-center text-3xl mb-10 mt-10 font-bold sm:text-5xl'>POINTS LEADER DASHBOARD</h1>
        {pointsData?.map((el,key) => {
          return(
            <div className=" w-3/6	 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
             flex flex-row justify-around leading-normal  mb-3 text-white text-xl items-center" key={key}>
                  <div className='bg-gray-900 p-4 ml-2 rounded-xl'>{key+1}</div>
              <div>{el.name}</div>
              {el.points>=0?       <div className=
           'bg-emerald-600 p-4 ml-2 rounded-xl'>{el.points}</div>:       <div className=
           'bg-red-900 p-4 ml-2 rounded-xl'>{el.points}</div>}
    
            </div>
       
          )
       })}
      </main>
    </>
  )
}
