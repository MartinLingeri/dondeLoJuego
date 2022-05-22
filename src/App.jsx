import { useState, useEffect } from "react";
import {
  Stack,
  Input,
  Heading,
  Button,
  IconButton,
  Box,
  Text,
  FormControl,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

import { key } from "./key";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [game, setGame] = useState("");
  const [gameSearched, setGameSearched] = useState("");
  const [storeLinks, setStoreLinks] = useState("");
  const [searchResponse, setSearchResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleInputChange(e) {
    setGame(e.target.value);
  }

  function removeSpaces(gameToSearch) {
    const newString = gameToSearch.trim();
    return newString.replaceAll(" ", "-");
  }

  async function searchGame(e) {
    e.preventDefault();
    if (game !== "") {
      try {
        setLoading(true);
        setError(false);
        var response = await fetch(
          `https://api.rawg.io/api/games?key=${key}&search=/${removeSpaces(
            game
          )}`
        ).then((resp) => {
          if (!resp.ok) {
            throw new Error("No se encontro el juego");
          } else {
            return resp.json();
          }
        });
        response = response.results[0];

        const store = await fetch(
          `https://api.rawg.io/api/games/${response.slug}/stores?key=${key}`
        ).then((resp) => {
          setLoading(false);
          if (!resp.ok) {
            throw new Error("No se encontro el juego");
          } else {
            return resp.json();
          }
        });

        setStoreLinks(store);
        setGameSearched(response.name);
        setSearchResponse(response);
      } catch (e) {
        setLoading(false);
        setError(true);
        setStoreLinks({});
        setGameSearched(game);
        setSearchResponse({});
        console.error("No se encontro el juego");
      }
    }
  }

  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent="center"
      h="100vh"
      marginInline={4}
    >
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
      <Box maxW="md">
        <form onSubmit={(e) => searchGame(e)}>
          <Stack direction="row" spacing={4}>
            <FormControl>
              <Input
                placeholder="DOOM Eternal"
                value={game}
                borderWidth={2}
                borderRadius="lg"
                onChange={(e) => handleInputChange(e)}
                isDisabled={loading ? true : false}
              ></Input>
            </FormControl>
            <Button
              type="submit"
              bgColor={colorMode === "light" ? "green.200" : "blue.500"}
              borderColor={colorMode === "light" ? "green.400" : "blue.700"}
              _hover={{
                opacity: "0.8",
              }}
              size="md"
              paddingInline="8"
              borderWidth={2}
              borderRadius="lg"
            >
              Buscar
            </Button>
          </Stack>
        </form>
      </Box>
      {loading ? (
        <Text display="inline-block" textAlign="center">
          Buscando{" "}
          <Text
            as="b"
            display="inline-block"
            fontWeight="900"
            textTransform="capitalize"
            overflowWrap="break-word"
            wordBreak="break-all"
          >
            {game}
          </Text>{" "}
          ...
        </Text>
      ) : (
        <Box>
          {error ? (
            <Text display="inline-block" textAlign="center">
              No encontre al{" "}
              <Text
                as="b"
                display="inline-block"
                fontWeight="900"
                textTransform="capitalize"
                overflowWrap="break-word"
                wordBreak="break-all"
              >
                {gameSearched}
              </Text>{" "}
              , trata de poner el nombre completo
            </Text>
          ) : (
            <Box>
              {Object.keys(searchResponse).length !== 0 && (
                <Stack
                  direction="row"
                  display="inline-block"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Text display="inline-block">
                    Podes jugar al{" "}
                    <Text
                      as="b"
                      display="inline-block"
                      fontWeight="900"
                      textTransform="capitalize"
                      overflowWrap="break-word"
                      wordBreak="break-all"
                    >
                      {gameSearched}
                    </Text>{" "}
                    en
                  </Text>
                  {searchResponse.stores ? (
                    searchResponse.stores.map((store, index) => (
                      <Box key={index} display="inline-block" paddingBlock={1}>
                        <Link
                          href={`${storeLinks.results[index].url}`}
                          color={
                            colorMode === "light" ? "green.500" : "blue.300"
                          }
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
                      </Box>
                    ))
                  ) : (
                    <Text>Ninguna tienda :(</Text>
                  )}
                </Stack>
              )}
            </Box>
          )}
        </Box>
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
          fontFamily="rawg"
          fontSize={28}
          fontWeight="700"
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
