
import { useState, useEffect } from 'react'
import { supabase } from '../services';
import Router from "next/router";

export default function Admin() {
 const [name, setName] = useState(null)
 const [pointsData, setPointsData] = useState([])

  useEffect(() => {
  getData()
 }, [])
  
async function getData() {
  try {
    let { data, error } = await supabase
    .from('points')
    .select('*')  .order('points', { ascending: false })
    if (error) {
      throw error
    }
    if (data) {
      setPointsData(data as any)
    }
  } catch (error) {
    alert('Error loading user data!')
  } 
}

  async function addOne() {
   try {
    const person = pointsData.filter((element:any) => element?.name == name)[0] as any;
      let { data, error } = await supabase
      .from('points')
       .update({ points: person.points+1})
       .eq('name', name)

     if (error) {
        console.log(error)
        throw error
      }
   
     alert(`تم اضافة نقطة ل ${name}`)

    } catch (error) {
      alert('ماش..  شكلة فيه شي خرب كلمي ساره تشوف شسالفه')
    } 
 }
 
 const  HandelNameChange= (e: React.ChangeEvent<HTMLSelectElement>)=> {
  setName(e.target.value as any);
   e.preventDefault();
 }
  return (
    <div className="m-5">
      <div className='flex flex-col gap-2  w-3/12'>
      <a
        className=" bg-gray-800 hover:bg-emerald-900
         text-white font-bold p-2 rounded text-xs    self-start  w-full text-center"
        onClick={ ()=>  Router.push('/')}>
        ألغو رحلتي      </a>
        <a
        className=" bg-gray-800 hover:bg-emerald-900
         text-white font-bold p-2 rounded text-xs    self-start w-full text-center"
        onClick={ ()=>  Router.push('/login')}>
Login </a>
</div>
            <h1 className='text-emerald-700 text-center text-3xl mb-10 mt-10 font-bold sm:text-5xl'> 👋حياك الله  </h1>
    <div className="flex flex-col items-center w-full mt-10">
     
<div className="flex justify-center items-center">
  <div className="mb-3 xl:w-96">
       <select
         onChange={HandelNameChange} 
        className="form-select appearance-none
      m-2
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-white
      bg-gray-800 bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
 
      focus:text-white-700 focus:bg-gray-800 focus:border-bg-gray-900 focus:outline-none" aria-label="Default select example">
        <option selected >أختاري اسم من القائمة</option>
        {pointsData?.map((el: any, key) => {
         return (
          <option key={key} value={el.name}
          >{el.name}</option>
         )
         })}
    </select>
  </div>
     </div>
     
        {name && <div>
          <p className=" text-center     text-white">👏   تستاهل { name}كفو</p>
      <button onClick={()=>addOne()} className="mt-5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded w-full     m-2">
      🥳   <span className="border-b border-red-900 "> {name}</span> ضيفي  نقطة لـ 
</button>

        </div>}


      </div>

    </div>
  )
  };

