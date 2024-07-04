# Markdown-blog

Markdown blog is a simple static site generated using next and markdown files. 

# How it works

Markdown blog reads in the contents of the posts folder, then uses the yaml to generate cards that navigate to a page for each blog post. The markdown of each blog post is safely rendered using react-markdown. 

There is also a dynamically rendered search page that uses a grapqhql endpoint to search the posts with elastisearch and then displays the list of matches. You can select if you would like to filter the search results by title or content.

## Setting up

This project is two nested node projects to avoid conflicts with configuration and typing. The inner project is housed in the graphql directory and essentially houses the graphql server and everything it needs to run. I have made it so you can run both from the outer project, and you can run `npm run install-all` to install modules for both the inner and outer projects. 

## To run
You must use two separate terminals to run this due to the nature and logging verbosity of the elasticsearch container. 

fist terminal:

`docker compose up` to start the elastisearch container

second terminal: 

`npm run dev` to start the graphql and Next server. 

## Elastic Search

There is a Graphql endpoint for deleting and re-initializing the elastic search index that is called when the home page is first rendered (essentially once per server startup). This is done for development purposees so that if you update the index between server starts you don't have to restart the elastic search server. It is also done to decouple this action from the starting of the graphql server. 

## To build static pages and serve

`npm run build` to build the next app (also starts the graphql server which is used for building).
`npm run serve` to serve the built static pages and start the graphql server (make sure you run the elastisearch container before starting).


## Entry Points

The two main entry points for the code are `src/app/page.tsx` and `graphql/index.ts`.


