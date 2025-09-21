import pool from "../database/db.js";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res) => {
  const form = req.body;
  const { personalInfo, healthInfo, generalInfo, termsAccepted } = form;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 1. Insert into users
    const hashedPassword = await bcrypt.hash(personalInfo.password, 10);
    const [userResult] = await conn.query(
      `INSERT INTO users (UserName, Email, PasswordHashed) VALUES (?, ?, ?)`,
      [personalInfo.username, personalInfo.email, hashedPassword]
    );
    const userId = userResult.insertId;

    // 2. Insert into memberprofiles
    const [profileResult] = await conn.query(
      `INSERT INTO memberprofiles (UserId, FirstName, LastName, PhoneNumber) VALUES (?, ?, ?, ?)`,
      [userId, personalInfo.username, personalInfo.username, personalInfo.phone]
    );
    const profileId = profileResult.insertId;

    // 3. Insert into personalinfos
    await conn.query(
      `INSERT INTO personalinfos (ProfileId, Gender, Nationality, FitnessType, FitnessGoal) VALUES (?, ?, ?, ?, ?)`,
      [
        profileId,
        personalInfo.gender,
        personalInfo.nationality,
        personalInfo.fitnessType,
        personalInfo.fitnessGoal,
      ]
    );

    // 4. Insert into healthinfos
    const healthStatus =
      healthInfo.hasConditions === "yes" ? "Has Conditions" : "Healthy";
    const [healthResult] = await conn.query(
      `INSERT INTO healthinfos (ProfileId, HeightCM, WeightKG, BMI, HealthStatus) VALUES (?, ?, ?, ?, ?)`,
      [
        profileId,
        healthInfo.height,
        healthInfo.weight,
        healthInfo.bmi,
        healthStatus,
      ]
    );
    const healthInfoId = healthResult.insertId;

    // 5. Insert medical conditions if any
    if (healthInfo.medicalConditions.length > 0) {
      const conditionsValues = healthInfo.medicalConditions.map((cond) => [
        healthInfoId,
        cond.name,
        cond.description || null,
        cond.startDate || null,
        cond.endDate || null,
      ]);
      await conn.query(
        `INSERT INTO medicalconditions (HealthInfoId, ConditionName, ConditionDescription, StartDate, EndDate) VALUES ?`,
        [conditionsValues]
      );
    }

    await conn.commit();
    res.status(201).json({ success: true, username: personalInfo.username });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: "Database error" });
  } finally {
    conn.release();
  }
};
