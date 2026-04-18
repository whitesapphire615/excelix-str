from flask import Flask, render_template, json
import os

app = Flask(__name__)
@app.route('/')
def index():
    # about
    with open('static/about.txt', 'r') as f:
        about = f.read()

    # contact links
    with open('static/contacts.json', 'r') as f:
        contact_links = json.load(f)

    # hobbies links
    with open('static/assets/hobbies/hobbies.json', 'r') as f:
        hobbies = json.load(f)

    # projects links
    with open('static/assets/projects/projects.json', 'r') as f:
        projects = json.load(f)

    # quote
    with open('static/quote.txt', 'r') as f:
        quote = f.read()


    # contacts
    github_link = contact_links.get('github', '#')
    instagram_link = contact_links.get('instagram', '#')
    twitter_link = contact_links.get('twitter', '#')
    youtube_link = contact_links.get("youtube",'#')

    # hobbies

    return render_template('index.html ',
                            about=about, 
                            github_link=github_link, 
                            instagram_link=instagram_link, 
                            twitter_link=twitter_link, 
                            youtube_link=youtube_link,
                            quote=quote,

                            hobbies=hobbies,
                            projects=projects,
                            
                            )

def init_app():
    pass

if __name__ == "__main__":
    init_app()
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    #host="0.0.0.0", port=int(os.environ.get("PORT", 5000))