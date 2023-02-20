'use-client'
import React from "react";
import useSWR from"swr";
import Select from 'react-select';

const fetcher = (url: string)=>{
    return fetch(url).then(res=>res.json())
}

export default function ModelSelection(){
    const {data: models, isLoading} = useSWR('/api/getEngine', fetcher); 
    
    const {data: model, mutate: setModel} = useSWR('model',{
        fallbackData: 'text-davinci-003'
    })

    
    return (
      <div>
        <Select
          className="mt-2"
          defaultValue={model}
          isSearchable
          isLoading={isLoading}
          menuPosition="fixed"
          classNames={{
            control: (state) => "bg-[#434654] border-[#434654]",
          }}
          placeholder={model}
          options={models?.modelOptions}
          onChange={(e) => setModel(e.value)}
        />
      </div>
    );
}



