from flask import Flask, render_template
import os , json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

about_path = 'static/about.txt'
contact_path = 'static/contacts.json'
hobby_path = 'static/assets/hobbies/hobbies.json'
project_path = 'static/assets/projects/projects.json'
quote_path = 'static/quote.txt'

def read_file(path, is_json=False):
    try:
        with open(os.path.join(BASE_DIR, path), 'r') as f:
            return json.load(f) if is_json else f.read()
    except:
        return {} if is_json else ""
    
data_cache = {}
def load_data():
    data_cache["about"] = read_file(about_path)
    data_cache["contacts"] = read_file(contact_path, True)
    data_cache["hobbies"] = read_file(hobby_path, True)
    data_cache["projects"] = read_file(project_path, True)
    data_cache["quote"] = read_file(quote_path)

load_data()
    
app = Flask(__name__)
@app.route('/')
def index():
    about = data_cache['about']
    contact_links = data_cache['contacts']
    hobbies = data_cache['hobbies']
    projects = data_cache['projects']
    quote = data_cache['quote']

    # contacts
    github_link = contact_links.get('github', '#')
    instagram_link = contact_links.get('instagram', '#')
    twitter_link = contact_links.get('twitter', '#')
    youtube_link = contact_links.get("youtube",'#')

    # hobbies

    return render_template('index.html',
                            about=about, 
                            github_link=github_link, 
                            instagram_link=instagram_link, 
                            twitter_link=twitter_link, 
                            youtube_link=youtube_link,
                            quote=quote,

                            hobbies=hobbies,
                            projects=projects,
                            
                            )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    #host="0.0.0.0", port=int(os.environ.get("PORT", 5000))