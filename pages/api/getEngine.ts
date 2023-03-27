import { NextApiRequest, NextApiResponse } from "next";
import openai from "../../lib/chatgpt";

type Option = {
    value: string;
    label: string;
}

type Data = {
    modelOption: Option[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    const models = await openai.listModels().then(
        (res: any) => res.data.data
    )

    const modelOption = models.map((model: any)=>({
        value: model.id,
        label: model.id
    }))
    // console.log(modelOption)
    res.status(200).json({modelOption})
}
