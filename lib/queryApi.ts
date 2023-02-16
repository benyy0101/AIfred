import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
    try{
        const response = await openai.createCompletion({
            model: model,
            prompt: prompt,
            temperature: 0.9,
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
        console.log(error.message);
        return "ChatGPT was unable to find answer for that!";
    }
}

export default query;