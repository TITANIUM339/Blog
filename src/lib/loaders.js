import { getUser } from "./queries";

export function loadUser(client) {
    return async () => await client.ensureQueryData(getUser());
}
