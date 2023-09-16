"use client";
import React, { useState, useEffect } from "react";
import {
   createGame,
   getGames,
   getGameById,
   editGameById,
   deleteGameById,
} from "../api";
type Game = {
   id: number;
   title: string;
   value: number;
   description: string;
};
type Props = {};

export default function Games({}: Props) {
   const [games, setGames] = useState<Game[]>([]);
   const [selectedGame, setSelectedGame] = useState<Game | null>(null);
   const [newGame, setNewGame] = useState({
      title: "",
      value: 0,
      description: "",
      bets: [],
   });

   // Function to fetch the list of games
   const fetchGames = async () => {
      try {
         const response = await getGames();
         setGames(response.data);
      } catch (error) {
         console.error("Error fetching games:", error);
      }
   };

   // Function to fetch a game by ID
   const fetchGameById = async (id: number) => {
      try {
         const response = await getGameById(id);
         setSelectedGame(response.data);
      } catch (error) {
         console.error(`Error fetching game with ID ${id}:`, error);
      }
   };

   // Function to create a new game
   const createNewGame = async () => {
      try {
         const response = await createGame(newGame);
         setNewGame({
            title: "",
            value: 0,
            description: "",
            bets: [],
         });
         fetchGames();
      } catch (error) {
         console.error("Error creating a new game:", error);
      }
   };

   // Function to update a game
   // not yet working
   const updateGame = async () => {
      if (!selectedGame) {
         return;
      }
      try {
         await editGameById(selectedGame.id, selectedGame);
         fetchGames();
      } catch (error) {
         console.error("Error updating the game:", error);
      }
   };

   // Function to delete a game
   const deleteSelectedGame = async (game: number) => {
      await deleteGameById(game);
      fetchGames();
   };

   useEffect(() => {
      fetchGames();
   }, []);

   return (
      <div>
         <h1>Games</h1>
         <table className="border-separate border-spacing-2 border border-slate-400">
            <thead>
               <tr>
                  <th className="border border-slate-300">Title</th>
                  <th className="border border-slate-300">Value</th>
                  <th className="border border-slate-300">Description</th>
               </tr>
            </thead>
            <tbody>
               {games.map((game) => (
                  <tr
                     className="space-y-2"
                     key={game.id}
                     onClick={() => fetchGameById(game.id)}
                  >
                     <td className="border border-slate-300">{game.title}</td>
                     <td className="border border-slate-300">{game.value}</td>
                     <td className="border border-slate-300">
                        {game.description}
                     </td>
                     <button onClick={() => deleteSelectedGame(game.id)}>
                        Delete Game
                     </button>
                  </tr>
               ))}
            </tbody>
         </table>
         <br />
         <div>
            <h2>Create New Game</h2>
            <input
               type="text"
               placeholder="Title"
               value={newGame.title}
               onChange={(e) =>
                  setNewGame({ ...newGame, title: e.target.value })
               }
            />
            <input
               type="number"
               placeholder="Value"
               value={newGame.value}
               onChange={(e) =>
                  setNewGame({
                     ...newGame,
                     value: parseInt(e.target.value, 10),
                  })
               }
            />
            <input
               type="text"
               placeholder="Description"
               value={newGame.description}
               onChange={(e) =>
                  setNewGame({ ...newGame, description: e.target.value })
               }
            />
            <button onClick={createNewGame}>Create Game</button>
         </div>
      </div>
   );
}
