import styled from "styled-components";
import { Text } from "@common/Text";
import { TitleText } from "@common/TitleText";
import FlexBox from "@common/ui/FlexBox";
import { Button } from "@common/ui/Buttons";
import { LIGHTEST_GREY, PRIMARY_700, PRIMARY_800 } from "@common/ui/colors";
import { useSelector } from "react-redux";
import { isVerifiedCorporateUser } from "@utils/helpers";
import { GRANT_THORNTON_ID, TFL_ORG_ID } from "../../constants";

const Card = styled(FlexBox)`
  padding: 1rem;
  background-color: ${LIGHTEST_GREY};
  border-radius: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 1.75rem;
  width: 1.75rem;
  margin-right: 1rem;
`;

const SessionCredits = ({ routeToCreditBooking, tracker, sessionCredits }) => {
  const user = useSelector(state => state.auth?.user);
  const isB2bUser = isVerifiedCorporateUser(user);
  if (!sessionCredits || Object.keys(sessionCredits).length === 0) return <></>;

  let credits = {};
  if (isB2bUser) {
    credits = Object.keys(sessionCredits)?.reduce((acc, key) => {
      if (!acc[key]) acc[key] = {};
      sessionCredits[key]?.forEach(o => {
        const type = !!o.ih_clinic_id ? "offline" : "online";
        if (!acc[key][type]) {
          acc[key][type] = [o];
        } else {
          acc[key][type].push(o);
        }
      });
      return acc;
    }, {});
  } else {
    credits = sessionCredits;
  }

  return sessionCredits ? (
    <>
      <Text bold block fontSize="1rem" margin="0 0 1rem 0">
        Sessions in credit:
      </Text>
      <Credits
        credits={credits}
        isB2bUser={isB2bUser}
        routeToCreditBooking={routeToCreditBooking}
        tracker={tracker}
        user={user}
      />
    </>
  ) : null;
};

const Credits = ({
  credits,
  isB2bUser,
  routeToCreditBooking,
  tracker,
  user,
}) => {
  if (isB2bUser) {
    const isTFLUser = user?.organisation_id === TFL_ORG_ID;
    const isGrantThorntonUser = user?.organisation_id === GRANT_THORNTON_ID;
    const hideCreditCount = isTFLUser || isGrantThorntonUser;

    return Object.keys(credits).map(duration =>
      Object.keys(credits?.[duration]).map((o, index) => (
        <Card
          key={`credit${duration}-${index}-${o}`}
          onClick={() => {
            routeToCreditBooking(credits?.[duration]?.[o]?.[0]);
          }}
        >
          <FlexBox align="center">
            <Icon
              src={
                o === "offline"
                  ? "/assets/images/icon-inperson-filled.svg"
                  : "/assets/images/icon-virtual-hollow.svg"
              }
            />
            <TitleText>{parseInt(duration) / 60} min</TitleText>
          </FlexBox>
          {!hideCreditCount && (
            <Text flex="1" bold>
              {credits?.[duration]?.[o]?.reduce(
                (acc, curr) => acc + curr.livesessions,
                0
              )}{" "}
              left
            </Text>
          )}
          <Button
            medium
            outline
            color={PRIMARY_800}
            hoverColor={PRIMARY_700}
            onClick={() => tracker(true, parseInt(duration) / 60)}
          >
            BOOK
          </Button>
        </Card>
      ))
    );
  } else {
    return Object.keys(credits).map((duration, index) => {
      return (
        <Card
          key={`credit${duration}-${index}`}
          onClick={() => {
            routeToCreditBooking(credits?.[duration]?.[0]);
          }}
        >
          <FlexBox align="center">
            <Icon src={"/assets/images/credits.svg"} />
            <TitleText>{parseInt(duration) / 60} min</TitleText>
          </FlexBox>
          <Text flex="1" bold>
            {credits?.[duration]?.reduce(
              (acc, curr) => acc + curr.livesessions,
              0
            )}{" "}
            left
          </Text>
          <Button
            medium
            outline
            color={PRIMARY_800}
            hoverColor={PRIMARY_700}
            onClick={() => tracker(true, parseInt(duration) / 60)}
          >
            BOOK
          </Button>
        </Card>
      );
    });
  }
};

SessionCredits.defaultProps = {
  tracker: () => {},
};

export default SessionCredits;
