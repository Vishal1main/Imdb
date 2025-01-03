import os
import logging
from pyrogram import Client, filters
from pyrogram.types import InlineKeyboardButton, InlineKeyboardMarkup, CallbackQuery, Message
from imdb import IMDb  # Assuming you're using IMDbPY or similar for fetching IMDb data

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create the client instance
app = Client(
    "IMDbBot",
    bot_token=os.getenv("7473136514:AAFFwsvkdTeSKEtys0yygJxNYSPp1e-4p10"),  # Get bot token from environment variables
    api_id=int(os.getenv("23171051")),    # Get API ID from environment variables
    api_hash=os.getenv("10331d5d712364f57ffdd23417f4513c")     # Get API Hash from environment variables
)

# Initialize IMDb instance
ia = IMDb()

# Template for displaying IMDb information
IMDB_TEMPLATE = """
**Title:** {title}
**AKA:** {aka}
**Votes:** {votes}
**Seasons:** {seasons}
**Box Office:** {box_office}
**Localized Title:** {localized_title}
**Kind:** {kind}
**IMDb ID:** {imdb_id}
**Cast:** {cast}
**Runtime:** {runtime}
**Countries:** {countries}
**Certificates:** {certificates}
**Languages:** {languages}
**Director:** {director}
**Writer:** {writer}
**Producer:** {producer}
**Composer:** {composer}
**Cinematographer:** {cinematographer}
**Music Team:** {music_team}
**Distributors:** {distributors}
**Release Date:** {release_date}
**Year:** {year}
**Genres:** {genres}
**Plot:** {plot}
**Rating:** {rating}
[IMDb Link]({url})
"""

async def get_poster(query, bulk=False, id=False):
    """Function to fetch IMDb information based on the movie/series title."""
    try:
        if bulk:
            # Fetch list of results for bulk search
            return ia.search_movie(query)
        elif id:
            # Fetch IMDb data based on IMDb ID
            movie = ia.get_movie(query)
            movie_data = {
                "title": movie["title"],
                "aka": movie.get("akas", []),
                "votes": movie.get("votes", ""),
                "seasons": movie.get("seasons", ""),
                "box_office": movie.get("box office", ""),
                "localized_title": movie.get("localized title", ""),
                "kind": movie.get("kind", ""),
                "imdb_id": movie.get("imdbID", ""),
                "cast": ', '.join([str(actor) for actor in movie.get("cast", [])]),
                "runtime": movie.get("runtime", ""),
                "countries": movie.get("countries", ""),
                "certificates": movie.get("certificates", ""),
                "languages": movie.get("languages", ""),
                "director": ', '.join([str(director) for director in movie.get("director", [])]),
                "writer": ', '.join([str(writer) for writer in movie.get("writer", [])]),
                "producer": ', '.join([str(producer) for producer in movie.get("producer", [])]),
                "composer": movie.get("composer", ""),
                "cinematographer": movie.get("cinematographer", ""),
                "music_team": movie.get("music", ""),
                "distributors": movie.get("distributors", ""),
                "release_date": movie.get("original air date", ""),
                "year": movie.get("year", ""),
                "genres": movie.get("genres", ""),
                "poster": movie.get("full-size cover url", ""),
                "plot": movie.get("plot", ""),
                "rating": movie.get("rating", ""),
                "url": f"https://www.imdb.com/title/{movie.get('imdbID')}/",
            }
            return movie_data
        return None
    except Exception as e:
        logger.error(f"Error fetching IMDb data: {e}")
        return None

@app.on_message(filters.command(["imdb", 'search']))
async def imdb_search(client, message):
    if ' ' in message.text:
        k = await message.reply('Searching IMDb...')
        r, title = message.text.split(None, 1)
        movies = await get_poster(title, bulk=True)
        if not movies:
            return await message.reply("No results Found.")
        btn = [
            [
                InlineKeyboardButton(
                    text=f"{movie.get('title')} - {movie.get('year')}",
                    callback_data=f"imdb#{movie.movieID}",
                )
            ]
            for movie in movies
        ]
        await k.edit('Here is what I found on IMDb', reply_markup=InlineKeyboardMarkup(btn))
    else:
        await message.reply('Give me a movie/series name.')

@app.on_callback_query(filters.regex('^imdb'))
async def imdb_callback(bot: Client, quer_y: CallbackQuery):
    i, movie = quer_y.data.split('#')
    imdb = await get_poster(query=movie, id=True)
    btn = [
            [
                InlineKeyboardButton(
                    text=f"{imdb.get('title')}",
                    url=imdb['url'],
                )
            ]
        ]
    message = quer_y.message.reply_to_message or quer_y.message
    if imdb:
        caption = IMDB_TEMPLATE.format(
            query=imdb['title'],
            title=imdb['title'],
            votes=imdb['votes'],
            aka=imdb["aka"],
            seasons=imdb["seasons"],
            box_office=imdb['box_office'],
            localized_title=imdb['localized_title'],
            kind=imdb['kind'],
            imdb_id=imdb["imdb_id"],
            cast=imdb["cast"],
            runtime=imdb["runtime"],
            countries=imdb["countries"],
            certificates=imdb["certificates"],
            languages=imdb["languages"],
            director=imdb["director"],
            writer=imdb["writer"],
            producer=imdb["producer"],
            composer=imdb["composer"],
            cinematographer=imdb["cinematographer"],
            music_team=imdb["music_team"],
            distributors=imdb["distributors"],
            release_date=imdb['release_date'],
            year=imdb['year'],
            genres=imdb['genres'],
            poster=imdb['poster'],
            plot=imdb['plot'],
            rating=imdb['rating'],
            url=imdb['url'],
            **locals()
        )
    else:
        caption = "No Results"
    if imdb.get('poster'):
        try:
            await quer_y.message.reply_photo(photo=imdb['poster'], caption=caption, reply_markup=InlineKeyboardMarkup(btn))
        except Exception as e:
            logger.exception(e)
            await quer_y.message.reply(caption, reply_markup=InlineKeyboardMarkup(btn), disable_web_page_preview=False)
        await quer_y.message.delete()
    else:
        await quer_y.message.edit(caption, reply_markup=InlineKeyboardMarkup(btn), disable_web_page_preview=False)
    await quer_y.answer()

if __name__ == "__main__":
    app.run()
