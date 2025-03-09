import { useState } from 'react'


export default function WaterForm() {
    const [usedWater, setUsedWater] = useState(0)
   
    return (
      <>
        <p> Edit the enter emout of water or ADD water</p>
        <p> correct enterned data</p>
        <p> amount of water </p>
        <button onClick={() => setUsedWater((usedWater) => usedWater + 50)}> + </button>
        <p> ${usedWater}+ml </p>
        <button onClick={() => setUsedWater((usedWater) => usedWater - 50)}> + </button>

        <p> Recording time</p>
        <p>time</p>
        <p>Enter the walue of the water used</p>
        <p>${usedWater}</p>
        <button type="submit">Save</button>
     </>
    );
  }