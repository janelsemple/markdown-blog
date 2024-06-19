# Markdown-blog

Markdown blog is a simple static site generated using next and markdown files. 

# How it works

Markdown blog reads in the contents of the posts folder, then uses the yaml to generate cards that navigate to a page for each blog post. The markdown of each blog post is safely rendered using react-markdown. 

There is also a dynamically rendered search page that uses a grapqhql endpoint to search the posts with elastisearch and then displays the list of matches. 

## Setting up

This project is two nested node projects to avoid conflicts with configuration and typing. The inner project is housed in the graphql directory and essentially houses the graphql server and everything it needs to run. I have made it so you can run both from the outer project, and you can run `npm run install-all` to install modules for both the inner and outer projects. 

## To run
You must use two separate terminals to run this due to the nature and logging verbosity of the elasticsearch container. 

fist terminal:

`docker compose up` to start the elastisearch container

second terminal: 

`npm run dev` to start the graphql and Next server. 

## To build and run

`npm run build` to build the next app
`npm run start` to run the built app and the graphql server (make sure you run the elastisearch container before starting).
