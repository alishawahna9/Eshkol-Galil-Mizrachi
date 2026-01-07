// API route for the Data Explorer view.
// Responsible for querying Prisma on the server and returning
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	TopGenderApiResponse,
	createTopWomenResponse,
	createTopMenResponse,
  createTopPeopleResponse,
} from "@/components/dataexplorer/dataexplorer-service";

// GET /api/dataexplorer
// Returns the "top 10" authorities by women / men / people,
// optionally filtered by municipalStatus query string.
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const status = searchParams.get("status");

		// If a municipal status filter was provided (and is not "all"),
		// resolve the matching authority symbols first.
		let symbolFilter: number[] | null = null;
		if (status && status !== "all") {
			const statusRows = await prisma.authorityGeneralInfo.findMany({
				select: { symbol: true },
				where: { municipalStatus: status },
			});
			symbolFilter = statusRows.map((r) => r.symbol);
			if (symbolFilter.length === 0) {
				const empty: TopGenderApiResponse = {
					women: { rows: [], totalWomen: 0 },
					men: { rows: [], totalMen: 0 },
					people: { rows: [], totalPeople: 0 },
				};
				return NextResponse.json(empty);
			}
		}

		// Fetch raw rows from the database
		const genderRows = await prisma.authorityDemographics.findMany({
			select: {
				name: true,
				men: true,
				women: true,
				symbol: true,
			},
			where: {
				...(symbolFilter && { symbol: { in: symbolFilter } }),
				OR: [
					{ women: { not: null } },
					{ men: { not: null } },
				],
			},
		});
		const womenPayload = createTopWomenResponse(
			genderRows.map((r) => ({ name: r.name, women: r.women })),
			10
		);
		const menPayload = createTopMenResponse(
			genderRows.map((r) => ({ name: r.name, men: r.men })),
			10
		);
		const peoplePayload = createTopPeopleResponse(
			genderRows.map((r) => ({
				name: r.name,
				people: (r.women ?? 0) + (r.men ?? 0),
			})),
			10
		);

		const payload: TopGenderApiResponse = {
			women: womenPayload,
			men: menPayload,
			people: peoplePayload,
		};

		return NextResponse.json(payload);
	} catch (error) {
		// Log the error server-side and return a generic 500 response to the client.
		console.error("/api/dataexplorer error", error);
		return NextResponse.json(
			{ error: "Failed to load data explorer" },
			{ status: 500 }
		);
	}
}

