import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string, temp:number) => {
    
    try{
        const response = await openai.createCompletion({
            model: model,
            prompt: prompt,
            temperature: temp,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,        
        });
        
        const data = response.data;
        const answer = data.choices[0].text;
        return answer;
    }
    catch (error){
        return "ChatGPT was unable to find answer for that!";
    }
}

export default query;