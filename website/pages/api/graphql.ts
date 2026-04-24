// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// API Routes with GraphQL: https://github.com/vercel/next.js/tree/canary/examples/api-routes-graphql 
import { createYoga, createSchema } from "graphql-yoga";
import { NotFoundBoundary } from "next/dist/client/components/not-found-boundary";

//TODO: 
// Build resolvers with the mocked data
// Build queries for the mocked data throughout the frontend

const MOCK_ENTRIES = [
    {id: 1, headword: 'tonchi', translation: 'cat'},
    {id: 2, headword: 'test2', translation: 'testing'}
]
const MOCK_VARIANTS = [
    {id: 11, variant: 'tonchi', entryID: 1, entry: MOCK_ENTRIES[0]},
    {id: 22, variant: 'test2', entryID: 2, entry: MOCK_ENTRIES[1]}
]
const MOCK_SPEAKERS = [
    {id: 123, name: 'Test Name'}
]
const MOCK_SPEAKER_ENTRY_ASSOCIATION = [
    {entryID: 1, speakerID: 123, entry: MOCK_ENTRIES[0], speaker: MOCK_SPEAKERS[0]}
]
const MOCK_MEANING = [
    {id: 1234, meaningCategory: 'animal'}
]
const MOCK_ENTRY_MEANING_ASSOCIATION = [
    {entryID: 1, meaningID: 1234, entry: MOCK_ENTRIES[0], meaning: MOCK_MEANING[0]}
]
const MOCK_AUDIO = [
    {id: 12345, audio_file: "https://linguistics.berkeley.edu/~sepomo/WordAudio/15apr07_LK1_549.mp3"}
]
const MOCK_ENTRY_AUDIO_ASSOCIATION = [
    {entryID: 1, audioID: 12345, entry: MOCK_ENTRIES[0], audio: MOCK_AUDIO[0]}
]
const MOCK_PHOTO = [
    {id: 123456, photo_file: "https://linguistics.berkeley.edu/~sepomo/clearlake.jpg"}
]
const MOCK_ENTRY_PHOTO_ASSOCIATION = [
    {entryID: 1, photoID: 123456, entry: MOCK_ENTRIES[0], audio: MOCK_PHOTO[0]}
]
export const typeDefs = `
    type Query {
        entry(headword: String!): Entry
        meaning(category: String!): Meaning
    }

    enum grammar {
        NOUN,
        VERB,
        ADJECTIVE
    }

    type Entry {
        id: ID!
        headword: String!
        translation: String!
        notes: String
        grammar: [grammar]
    }

    type Variant {
        id: ID!
        variant: String!
        context: String
        entryID: ID!
        entry: Entry!
    }

    type Speaker {
        id: ID!
        name: String!
    }

    type EntrySpeakerAssociation {
        entryID: ID!
        speakerID: ID!
        entry: Entry!
        speaker: Speaker! 
    }

    type Meaning {
        id: ID!
        meaning_category: String!
    }

    type EntryMeaningAssociation {
        entryID: ID!
        meaningCategoryID: ID!
        entry: Entry!
        meaning: Meaning!
    }

    type Audio {
        id: ID!
        audio_file: String!
    }

    type EntryAudioAssociation {
        entryID: ID!
        audioID: ID!
        entry: Entry!
        audio: Audio!
    }

    type Photo {
        id: ID!
        photo_file: String!
    }

    type entryPhotoAssociation {
        entryID: ID!
        photoID: ID!
        entry: Entry!
        photo: Photo!
    }
`;

/*
entry(headword) query: 
*/
const resolvers = {
  Query: {
    entry(parent: any, args: { id: number; }, contextValue: any, info: any) {
        return {...MOCK_ENTRIES.find((entry) => entry.id === args.id), 
            ...MOCK_VARIANTS.find((variant) => variant.entryID === args.id), 
        ...MOCK_ENTRY_AUDIO_ASSOCIATION.find((audio) => audio.entryID === args.id),
        ...MOCK_SPEAKER_ENTRY_ASSOCIATION.find((speaker) => speaker.entryID === args.id),
        ...MOCK_ENTRY_MEANING_ASSOCIATION.find((entry) => entry.entryID === args.id)};
        },  
         
    }
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
