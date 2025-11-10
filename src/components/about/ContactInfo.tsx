interface ContactInfoProps {
    email: string;
    phone: string;
    introText?: string;
}

export const ContactInfo = ({ email, phone, introText = "Para mas informacion" }: ContactInfoProps) => {
    return (
        <p className="tracking-tighter leading-7 text-sm font-medium text-slate-800">
            {introText}{' '}
            <a href={`mailto:${email}`} className="text-rose-500 hover:underline">
                {email}
            </a>
            {' '}o llamando al{' '}
            <a href={`tel:${phone}`} className="text-rose-500 hover:underline">
                {phone}
            </a>
        </p>
    );
};
