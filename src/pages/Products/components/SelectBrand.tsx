import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import { getListBrand } from 'src/services/product.services';
type Props = {
    value: string,
    onSelect:(val:string)=>void;
}

function SelectBrand({value,onSelect}: Props) {
    const [options,setOptions] = useState([])
    useEffect(()=>{
        getData()
    },[])
    const getData = ()=>{
        getListBrand().then(res=>{
            setOptions(res.data.map(item=>({label:item,value:item})))
        })
    }

  return (
    <Select
    defaultValue={value}
    style={{ width: 120 }}
    onChange={onSelect}
    options={options}
    className=' tw-w-full'
    placeholder="Chọn thương hiệu"
  />
  )
}

export default SelectBrand