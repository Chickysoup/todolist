from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel #validates http requests, makes sure everything in order
from typing import List, Optional
#creates instance, title is for autogen API documentation
app = FastAPI(title = "Todo API")

# CORS middleware config
#allows frontend to make requests to API, since frontend is running on diff port

app.add_middleware(
    CORSMiddleware,
    #lists of origins allowed to make request
    allow_origins=["http://localhost:5173"], #vite default URL
    #in prod, different ports serve the front end and back end,
    #separate servers. a reverse proxy would link these two together so they come from the same URL

    allow_credentials=True,#supports cookies in cross-origin reqs(??)
    allow_methods=["GET","POST","PUT","DELETE"], #self expl

    allow_headers=["*"] #allows HTTP headers (metadata sent along w/ http body)
)

class Todo(BaseModel): #format of data coming in from todo app
    id: int            
    text: str
    completed: bool

todos: List[Todo] = [] #weird syntax, explain:
#todos is the variable name, : after is type annotation
# List is the type, and List[Todo] is how the data will be formatted
# = [] means the list will start off empty


#Endpoint define example
#@app.get is a decorator, tells fastapi this is GET req
#"/api" is the URL path 
@app.get("/api")
def read_root():
    #function executes, returns json below
    return {"message": "Todo API running"}

#runs app directly, no need to reload uvicorn

if __name__ == "__main__":
    import uvicorn

    #main.py file, host makes server accessible from any ip
    #runs on port 8000
    #auto reloads
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
