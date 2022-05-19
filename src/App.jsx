import { useState, useEffect } from "react";
import {
  Stack,
  Input,
  Heading,
  Button,
  IconButton,
  Box,
  Text,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import WebFont from "webfontloader";
import { FaSun, FaMoon } from "react-icons/fa";

import { key } from "./key";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [game, setGame] = useState("");
  const [gameSearched, setGameSearched] = useState("");
  const [storeLinks, setStoreLinks] = useState("");
  const [searchResponse, setSearchResponse] = useState({});

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["BlinkMacSystemFont", "Inter", "Helvetica Neue"],
      },
    });
  }, []);

  function handleInputChange(e) {
    setGame(e.target.value);
  }

  function removeSpaces(gameToSearch) {
    const newString = gameToSearch.trim();
    return newString.replaceAll(" ", "-");
  }

  async function searchGame() {
    if (game !== "") {
      const response = await fetch(
        `https://api.rawg.io/api/games/${removeSpaces(game)}?key=${key}`
      )
        .then((resp) => resp.json())
        .catch((error) => console.log(error));

      const store = await fetch(
        `https://api.rawg.io/api/games/${removeSpaces(game)}/stores?key=${key}`
      ).then((resp) => resp.json());

      console.log(response);
      setStoreLinks(store);
      setGameSearched(response.name);
      setSearchResponse(response);
    }
  }

  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" h="100vh">
      <Stack direction="row" spacing={6}>
        <Heading>¿Dónde Lo Juego?</Heading>
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          variant="outline"
          borderRadius={9999}
          borderWidth={2}
          size="lg"
          onClick={toggleColorMode}
        ></IconButton>
      </Stack>
      <Box minWidth="md">
        <Stack direction="row" spacing={4}>
          <Input
            placeholder="DOOM Eternal"
            value={game}
            borderWidth={2}
            borderRadius="lg"
            onChange={(e) => handleInputChange(e)}
          ></Input>
          <Button
            bgColor={colorMode === "light" ? "green.200" : "blue.500"}
            borderColor={colorMode === "light" ? "green.400" : "blue.700"}
            _hover={{
              opacity: "0.8",
            }}
            size="md"
            paddingInline="8"
            borderWidth={2}
            borderRadius="lg"
            onClick={() => searchGame()}
          >
            Buscar
          </Button>
        </Stack>
      </Box>
      {Boolean(gameSearched) && (
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1}>
            <Text display="inline-block">Podes jugar </Text>
            <Text
              display="inline-block"
              fontWeight="900"
              textTransform="capitalize"
            >
              {gameSearched}
            </Text>
            <Text display="inline-block"> en</Text>
          </Stack>
          <Stack direction="row" display="inline-block" spacing={2}>
            {searchResponse.stores.map((store, index) => (
              <Link
                key={index}
                href={`${storeLinks.results[index].url}`}
                color="blue.300"
                fontWeight="900"
                textDecorationLine="underline"
                textDecorationStyle="dotted"
                textDecorationThickness="2px"
                textUnderlineOffset="2px"
                _hover={{ opacity: 0.7 }}
                isExternal
              >
                {store.store.name}
              </Link>
            ))}
          </Stack>
        </Stack>
      )}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        opacity="0.6"
        paddingTop={4}
      >
        <Heading display="inline-block" fontSize="lg" fontWeight="normal">
          Funciona gracias a{" "}
        </Heading>
        <Link
          href="https://rawg.io"
          fontFamily="Inter"
          fontSize={28}
          fontWeight="900"
          lineHeight="1"
          letterSpacing={8}
          textTransform="uppercase"
          isExternal
        >
          rawg
        </Link>
      </Stack>
    </Stack>
  );
}

export default App;
