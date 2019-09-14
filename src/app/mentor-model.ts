export class MentorModel {
    constructor(
        public name: string,
        public email: string,
        public phone: number,
        public experience: number,
        public startDate: Date,
        public endDate: Date,
        public technology: string,
        public linkedInUrl: string,
        public password: string,
        public confirmPassword: string
    ) {}
}
