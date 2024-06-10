# Usage

Run ollama server
```bash
ollama serve
```

Send a POST request to the Ollama API with the following JSON payload:
```bash
curl -X POST http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt":"Write 3 random words"
 }'
```

Start the Flask application:
```bash
flask --app app run --debug
```

Send a request to http://127.0.0.1:5000/send with the following JSON payload:
```bash
{
    "message": "your request"
}
```

