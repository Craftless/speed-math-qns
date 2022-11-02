import { useEffect, useState } from "react";
import LeaderboardEntry from "../components/LeaderboardEntry";
import LoadingSpinner from "../components/LoadingSpinner";
import { projectDatabase, projectFirestore } from "../firebase/config";
import firebase from "firebase/compat/app";
import classes from "./LeaderboardPage.module.css";
import { fetchDisplayNameAndPhotoURLFromUid } from "../util/auth";

interface PlayerRepresentation {
  rank: number;
  displayName: string;
  pfpUrl: string;
  totalScore: number;
  userId: string;
}

function LeaderboardPage() {
  const [leaderboardArray, setLeaderboardArray] = useState(
    [] as PlayerRepresentation[]
  );

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

      // Format the data
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

      // Sort by score
      finalArr.sort((a, b) => b.totalScore - a.totalScore);

      // Construct array of PlayerRepresentations
      const lbArr: PlayerRepresentation[] = [];

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
    })();
  }, []);

  return (
    <div className={classes.outerContainer}>
      <h2 className={classes.leaderboardLabel}>Leaderboard</h2>
      {leaderboardArray.length > 0 && (
        <div className={classes.mainContainer}>
          <div className={classes.leaderboardContainer}>
            <div className={classes.topBarContainer}>
              <p>Rank</p>
              <p>Name</p>
              <p>Total Score</p>
            </div>
            {leaderboardArray.map((val, index, arr) => (
              <>
                {/* {index < arr.length - 1 && ( */}
                <div className={classes.separator} />
                {/* )} */}
                <LeaderboardEntry
                  position={val.rank}
                  name={val.displayName}
                  score={val.totalScore}
                  key={val.userId}
                />
              </>
            ))}
          </div>
          <div className={classes.hintTextContainer}>
            <p>To refresh the leaderboard, reload the page.</p>
          </div>
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
