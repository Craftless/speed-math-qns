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
  valueToDisplay: number;
  userId: string;
}

function LeaderboardPage()
{
  const [leaderboardArray, setLeaderboardArray] =
    useState( [] as PlayerRepresentation[] );

  const [lbType, setLbType] = useState("totalScore");

  useEffect(() => {
    (async () => {
      const lowest20: { [uid: string]: number; } = await
      (await projectDatabase.ref(`top20/${lbType}`)
            .orderByValue()
            .limitToFirst(1)
            .get()
      ).val();

      // 1. Fetch data from Firebase
      const data = (
        await projectFirestore
          .collection(lbType)
          .where(
            firebase.firestore.FieldPath.documentId(),
            ">=",
            String(Object.values(lowest20)[0] - 100)
          )
          .get()
      ).docs;
      const objArr = data.map( (val) => val.data() );

      // 1a. Format the data
      // I have absolutely no idea what this does -AV306
      let finalObj: { [uid: string]: number; } = {};
      for (const bracketObj of objArr) {
        finalObj = { ...finalObj, ...bracketObj };
      }

      const finalArr = Object.keys(finalObj)
          .map((key) => {
              return {
              uid: key,
              valueToDisplay: finalObj[key],
           };
      });

      // Sort by score
      finalArr.sort((a, b) => b.valueToDisplay - a.valueToDisplay);

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
              valueToDisplay: item.valueToDisplay,
              userId: item.uid,
            });
        })
      );

      setLeaderboardArray(lbArr);
      console.log("Arr", lbArr);
    })();
  }, [lbType]);

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
                <div className={classes.separator} />
                <LeaderboardEntry
                  position={val.rank}
                  name={val.displayName}
                  score={val.valueToDisplay}
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
