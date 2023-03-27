import {Knob} from 'primereact/knob';
import useSWR from 'swr';

export default function TempForm() {

    const {data:temp, mutate:setTemp} = useSWR("temp",{
        fallbackData: 0.9
    })

    return (
        <div className='mt-3 p-3 pt-1 flex flex-col space-y-3 bg-gray-600 rounded-lg'>
            <label htmlFor="temperature"
            className='text-white
            font-bold
            mt-4
            '

            >Temperature</label>
            <input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={e=>{return setTemp(e.target.valueAsNumber)}}
                name="temperature"
                value={temp}
            ></input>
            <div className='text-white text-bold pl-1'>{temp}</div>
        </div>
    );
}