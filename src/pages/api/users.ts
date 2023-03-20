// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { User } from "eos-lib/models/user";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<User[]>
) {
	res
		.status(200)
		.json(
			Array.from({ length: 120000 }).map((x, index) => createRandomUser(index))
		);
}

function createRandomUser(id: number): User {
	return {
		id: id,
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
		birthdate: faker.date.birthdate(),
	};
}
