import { observer } from "mobx-react";
import React from "react";
import { useStore } from "../../../useStore";
import Card from "../card/Card";
import "./Player.scss";

interface PlayerProps {
    playerId: 0 | 1 | 2 | 3;
}

const Player: React.FC<PlayerProps> = observer(({ playerId }) => {
    const store = useStore();
    const { playerList } = store.players;
    const hasGameBeenInitialized = typeof playerList !== "undefined";
    if (!hasGameBeenInitialized) return <></>;

    const playerAtThisSlot = playerList.find(player => player.id === playerId);
    const isTherePlayerAtThisSlot = typeof playerAtThisSlot !== "undefined";
    if (!isTherePlayerAtThisSlot) return <></>;

    const cards = playerAtThisSlot.cards;
    return (
        <div className={`player noSelect  player-${playerId} ${playerAtThisSlot?.hasFolded ? "folded" : ""}`}>
            <div className={`playerInfo ${store?.isGameActive && store.players?.activePlayer === playerAtThisSlot ? "activePlayerInfo" : ""} ${store?.winners?.includes(playerAtThisSlot) ? "winnerPlayerInfo" : ""}`}>
                {/* <div className="playerInfoText">
                    {store.players?.bigBlindPlayer === playerAtThisSlot && "big blind"}
                    {store.players?.smallBlindPlayer === playerAtThisSlot && "small blind"}
                </div> */}
                <div className={`playerInfoBody`}>
                    {/* <div className="background-animation"></div> */}
                    <div className="playerCards">
                        {
                            cards.map(({ suitName, suitSymbol, cardName, cardSymbol, isFaded, isHidden }) => {
                                return <Card key={`${suitName}_${cardName}`} value={cardSymbol} suit={suitSymbol} isFaded={isFaded} isHidden={isHidden} />
                            })
                        }
                    </div>
                    <div className="playerName">{playerAtThisSlot?.name}</div>
                    <div className="playerMoneyLeft">{playerAtThisSlot?.moneyLeft} €</div>
                </div>
            </div>
            <div className="playerBet">
                {playerAtThisSlot?.sumOfPersonalBetsInThisRound} €
                {store.players?.bigBlindPlayer === playerAtThisSlot && <div className='big-blind'>BIG BLIND</div>}
                {store.players?.smallBlindPlayer === playerAtThisSlot && <div className='small-blind'>SMALL BLIND</div>}
            </div>
        </div>
    );
});
export default Player;
