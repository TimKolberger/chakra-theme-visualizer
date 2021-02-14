import * as React from "react";
import { Center, Heading, Button, VStack } from "@chakra-ui/react";
import { Layout } from "./Layout";
import { Link } from "./Link";

export type NotFoundPageProps = {};
export const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <Layout>
      <Center w="full">
        <VStack spacing="8">
          <Heading size="md">Page not found</Heading>
          <Button as={Link} to="/">
            Go back
          </Button>
        </VStack>
      </Center>
    </Layout>
  );
};
