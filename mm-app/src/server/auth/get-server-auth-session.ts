import { type GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

type Ctx = {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}

export const getServerAuthSession = async ({req, res}: Ctx) => await unstable_getServerSession(req, res, authOptions);
