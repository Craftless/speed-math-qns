import { useEffect, useState } from "react";
import LeaderboardEntry from "../components/LeaderboardEntry";
import LoadingSpinner from "../components/LoadingSpinner";
import { projectDatabase, projectFirestore } from "../firebase/config";
import firebase from "firebase/compat/app";
import classes from "./LeaderboardPage.module.css";
import { fetchDisplayNameAndPhotoURLFromUid } from "../util/auth";

class PlayerRepresentation {
  name: string;
  score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}

// Unfortunately, I have to use regular arrays here
// because states would "exceed the maximum update depth"
var leaderboardArray: JSX.Element[];
var players: PlayerRepresentation[];

function LeaderboardPage() {
  const [leaderboardArray, setLeaderboardArray] = useState(
    [] as {
      rank: number;
      displayName: string;
      pfpUrl: string;
      totalScore: number;
      userId: string;
    }[]
  );
  const [players, setPlayers] = useState([] as PlayerRepresentation[]);

  useEffect(() => {
    (async () => {
      const lowest20: {
        [uid: string]: number;
      } = await (
        await projectDatabase.ref("top20").orderByValue().limitToFirst(1).get()
      ).val();

      // 1. Fetch data from Firebase
      const data = (
        await projectFirestore
          .collection("lbTotalScore")
          .where(
            firebase.firestore.FieldPath.documentId(),
            ">=",
            String(Object.values(lowest20)[0] - 100)
          )
          .get()
      ).docs;
      const objArr = data.map((val) => val.data());
      // const data = await projectFirestore.collection('lbTotalScore').orderBy(firebase.firestore.FieldPath.documentId()).limit(3).get();

      console.log("obj", objArr);
      let finalObj: {
        [uid: string]: number;
      } = {};
      for (const bracketObj of objArr) {
        finalObj = { ...finalObj, ...bracketObj };
      }

      const finalArr = Object.keys(finalObj).map((key) => {
        return {
          uid: key,
          totalScore: finalObj[key],
        };
      });

      finalArr.sort((a, b) => b.totalScore - a.totalScore);

      const lbArr: {
        rank: number;
        displayName: string;
        pfpUrl: string;
        totalScore: number;
        userId: string;
      }[] = [];

      await Promise.all(
        finalArr.map(async (item, index) => {
          const userDetails = await fetchDisplayNameAndPhotoURLFromUid(
            item.uid
          );
          if (userDetails)
            lbArr.push({
              rank: index + 1,
              ...userDetails,
              totalScore: item.totalScore,
              userId: item.uid,
            });
        })
      );

      setLeaderboardArray(lbArr);
      console.log("Arr", lbArr);

      // objArr.map(val => {
      //   Object.keys(val)
      // })

      // setPlayers(data)

      // 2. Construct array of PlayerRepresentations?
      // players = [
      //   new PlayerRepresentation("a", 523),
      //   new PlayerRepresentation("de", 444),
      // ];

      // 3. Sort by score
      // players.sort((a, b) => {
      //   return b.score - a.score;
      // });

      // 4. Add <LeaderboardEntry /> elements
      // for (var i: number = 1; i <= players.length; i++) {
      //   var player: PlayerRepresentation = players[i - 1];
      //   leaderboardArray.push(
      //     <LeaderboardEntry
      //       position={i}
      //       name={player.name}
      //       score={player.score}
      //     />
      //   );
      // }
    })();
  }, [players]);

  return (
    <div className={classes.outerContainer}>
      <h2 className={classes.leaderboardLabel}>Leaderboard</h2>
      {leaderboardArray.length > 0 && (
        <div className={classes.mainContainer}>
          <div className={classes.leaderboardContainer}>
            {leaderboardArray.map((val) => (
              <LeaderboardEntry
                position={val.rank}
                name={val.displayName}
                score={val.totalScore}
                key={val.userId}
              />
            ))}
          </div>
          <p>To refresh the leaderboard, reload the page.</p>
        </div>
      )}
      {leaderboardArray.length <= 0 && (
        <div className={classes.spinnerContainer}>
          <LoadingSpinner width={20} height={20} borderWidth={4} />
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
