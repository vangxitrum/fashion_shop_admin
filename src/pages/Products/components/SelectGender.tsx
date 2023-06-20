import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import { getListBrand } from 'src/services/product.services';
type Props = {
  value: string,
  onSelect: (val: string) => void;
}

function SelectGender({ value, onSelect }: Props) {
  const options = [{ value: "Nam", label: "MAN" },{ value: "Nam", label: "WOMEN" },{ value: "Nam", label: "KID" }]
  const itemActive = options.find(i => i.label === value) || null;
  return (
    <Select
      defaultValue={value}
      style={{ width: 120 }}
      onChange={onSelect}
      options={options}
      className=' tw-w-full'
      placeholder="Chọn giới tính"
    />
  )
}

export default SelectGender