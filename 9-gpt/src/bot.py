from dotenv import load_dotenv
from langchain_community.llms import Ollama
from const import (
    BASE_URL,
    MESSAGE,
    MODEL
)

load_dotenv()

def send_request(request):
    message = request[MESSAGE]
        
    ollama = Ollama(
        base_url=BASE_URL,
        model=MODEL
    )
    
    return ollama.invoke(message)
